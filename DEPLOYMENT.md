# Deployment Guide for Lift Tracker

This guide will walk you through deploying your containerized application to DigitalOcean.

## Prerequisites

- DigitalOcean Droplet (Ubuntu 22.04 LTS recommended, minimum 2GB RAM)
- DigitalOcean Volume (recommended: 10GB or larger for database storage)
- Domain name
- SSH access to your droplet

## Step 1: Prepare Your Droplet

### 1.1 SSH into your droplet
```bash
ssh root@your_droplet_ip
```

### 1.2 Update system packages
```bash
apt update && apt upgrade -y
```

### 1.3 Install Docker
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Start Docker service
systemctl start docker
systemctl enable docker

# Verify installation
docker --version
```

### 1.4 Install Docker Compose
```bash
# Download Docker Compose
mkdir -p /usr/local/lib/docker/cli-plugins/
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /usr/local/lib/docker/cli-plugins/docker-compose

# Make it executable
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Verify installation
docker compose version
```

### 1.5 Install Git (if not already installed)
```bash
apt install git -y
```

### 1.6 Set up firewall
```bash
# Allow SSH, HTTP, and HTTPS
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### 1.7 Attach and mount DigitalOcean Volume

**In DigitalOcean Dashboard:**
1. Go to Volumes in the sidebar
2. Create a new volume or select existing volume
3. Choose size (recommended: 10GB minimum)
4. Select the same region as your droplet
5. Attach to your droplet

**On your droplet:**
```bash
# Check if volume is attached and where it's mounted
lsblk
```

You'll see output like:
```
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
sda      8:0    0   10G  0 disk /mnt/volume_atl1_01
vda    252:0    0   25G  0 disk
├─vda1 252:1    0   25G  0 part /
```

**OPTION 1: Use the existing mount point (Recommended - Easier)**

If DigitalOcean already mounted your volume (you see a MOUNTPOINT like `/mnt/volume_atl1_01`):

```bash
# Create directories for Docker volumes
# Replace /mnt/volume_atl1_01 with YOUR actual mount point from lsblk!
mkdir -p /mnt/volume_atl1_01/mysql
mkdir -p /mnt/volume_atl1_01/backups

# Set proper permissions
chown -R 999:999 /mnt/volume_atl1_01/mysql  # MySQL user in Docker
chmod -R 755 /mnt/volume_atl1_01

# Verify
ls -la /mnt/volume_atl1_01
df -h /mnt/volume_atl1_01
```

**IMPORTANT:** The `docker-compose.yml` is already configured for `/mnt/volume_atl1_01`. If your mount point is different, update it:
```bash
nano /opt/lift-tracker/docker-compose.yml
# Update the volume path to match your actual mount point
```

**OPTION 2: Remount to custom location**

If you prefer to use `/mnt/lift_tracker_volume`:

```bash
# Get the volume device name
VOLUME_DEVICE=$(lsblk -no NAME,MOUNTPOINT | grep volume_atl1 | awk '{print "/dev/"$1}')
echo $VOLUME_DEVICE  # Should show /dev/sda or similar

# Unmount from current location
umount /mnt/volume_atl1_01

# Create new mount point
mkdir -p /mnt/lift_tracker_volume

# Mount to new location
mount -o discard,defaults,noatime $VOLUME_DEVICE /mnt/lift_tracker_volume

# Verify it's mounted
df -h | grep lift_tracker_volume

# Update fstab for persistence (find the UUID)
blkid $VOLUME_DEVICE
# Copy the UUID from output

# Edit fstab (replace the old entry or add new one)
nano /etc/fstab
# Change the existing volume entry to:
# UUID=your-uuid-here /mnt/lift_tracker_volume ext4 defaults,nofail,discard 0 0

# Create directories
mkdir -p /mnt/lift_tracker_volume/mysql
mkdir -p /mnt/lift_tracker_volume/backups

# Set proper permissions
chown -R 999:999 /mnt/lift_tracker_volume/mysql
chmod -R 755 /mnt/lift_tracker_volume

# Verify
ls -la /mnt/lift_tracker_volume
```

**Format new volume (ONLY if completely new and empty):**
```bash
# WARNING: Only run this if the volume is brand new and has no data!
# Check first: lsblk -f
# If it shows no filesystem, you can format:
mkfs.ext4 -F /dev/sda  # Use your actual device name, NOT the mount point
```

## Step 2: Deploy Your Application

### 2.1 Clone your repository to the droplet
```bash
cd /opt
git clone https://github.com/yourusername/lift-tracker.git
cd lift-tracker
```

**OR** if you're copying files directly:
```bash
# On your local machine
rsync -avz --exclude 'node_modules' --exclude '.git' \
  /Users/davidfoxlee/Documents/programming/lift-tracker/ \
  root@your_droplet_ip:/opt/lift-tracker/
```

### 2.2 Create environment file
```bash
cd /opt/lift-tracker
cp .env.example .env
nano .env
```

Update with your production values:
- Strong passwords for database
- Secure JWT secret (use: `openssl rand -base64 32`)
- Your email credentials
- Your domain name for FRONTEND_URL

### 2.3 Build and start the containers
```bash
docker compose up -d --build
```

### 2.4 Verify containers are running
```bash
docker compose ps
```

You should see three containers running: db, backend, and frontend.

### 2.5 Check logs if needed
```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f db
```

## Step 3: Set Up SSL with Let's Encrypt

### 3.1 Install Certbot
```bash
apt install certbot python3-certbot-nginx -y
```

### 3.2 Stop the frontend container temporarily
```bash
docker compose stop frontend
```

### 3.3 Get SSL certificate
```bash
certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts:
- Enter your email address
- Agree to terms of service
- Choose whether to share your email

### 3.4 Create SSL directory and copy certificates
```bash
mkdir -p /opt/lift-tracker/ssl
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /opt/lift-tracker/ssl/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /opt/lift-tracker/ssl/
```

### 3.5 Update nginx configuration for SSL
Edit `frontend/nginx.conf` to add SSL configuration:
```bash
nano /opt/lift-tracker/frontend/nginx.conf
```

Replace with:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # API proxy
    location /api/ {
        proxy_pass http://backend:4004;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3.6 Rebuild and restart containers
```bash
docker compose up -d --build
```

### 3.7 Set up automatic certificate renewal
```bash
# Test renewal
certbot renew --dry-run

# Create renewal hook
cat > /etc/letsencrypt/renewal-hooks/deploy/copy-certs.sh << 'EOF'
#!/bin/bash
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem /opt/lift-tracker/ssl/
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem /opt/lift-tracker/ssl/
docker compose -f /opt/lift-tracker/docker-compose.yml restart frontend
EOF

chmod +x /etc/letsencrypt/renewal-hooks/deploy/copy-certs.sh
```

## Step 4: Configure DNS (A Record)

### 4.1 Get your droplet's IP address
```bash
curl -4 icanhazip.com
```

### 4.2 Configure DNS at your domain registrar

1. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Navigate to DNS settings
3. Add/Edit A records:

```
Type: A
Name: @ (or leave blank for root domain)
Value: your_droplet_ip
TTL: 3600 (or default)

Type: A
Name: www
Value: your_droplet_ip
TTL: 3600 (or default)
```

4. Save changes

**Note:** DNS propagation can take 5 minutes to 48 hours, but typically completes within 1-2 hours.

### 4.3 Verify DNS propagation
```bash
# Check from your droplet
nslookup yourdomain.com

# Or use online tools
# https://www.whatsmydns.net/
```

## Step 5: Verify Deployment

### 5.1 Test the application
Open your browser and visit:
- `https://yourdomain.com` - Should load your frontend
- `https://yourdomain.com/api/v1/test` - Should return API test response

### 5.2 Monitor logs
```bash
docker compose logs -f
```

## Maintenance Commands

### Update application
```bash
cd /opt/lift-tracker
git pull  # or rsync new files
docker compose up -d --build
```

### View logs
```bash
docker compose logs -f [service_name]
```

### Restart services
```bash
docker compose restart [service_name]
```

### Stop all services
```bash
docker compose down
```

### Database backup
```bash
# Backup to the volume (use your actual volume mount point)
docker compose exec db mysqldump -u root -p lift_tracker > /mnt/volume_atl1_01/backups/backup_$(date +%Y%m%d).sql

# Or backup directly from the container
docker compose exec -T db mysqldump -u root -p${MYSQL_ROOT_PASSWORD} lift_tracker > /mnt/volume_atl1_01/backups/backup_$(date +%Y%m%d).sql
```

### Remove everything (including data)
```bash
docker compose down -v
```

## Troubleshooting

### Check container status
```bash
docker compose ps
docker compose logs backend
docker compose logs frontend
docker compose logs db
```

### Enter a container
```bash
docker compose exec backend sh
docker compose exec frontend sh
docker compose exec db mysql -u root -p
```

### Check network connectivity
```bash
docker compose exec backend ping db
docker compose exec frontend ping backend
```

### Reset and rebuild
```bash
docker compose down
docker compose up -d --build --force-recreate
```

## Security Recommendations

1. **Change default passwords** - Use strong, unique passwords
2. **Keep system updated** - Regular `apt update && apt upgrade`
3. **Enable firewall** - Only allow necessary ports
4. **Regular backups** - Automate database backups
5. **Monitor logs** - Set up log monitoring/alerts
6. **Use secrets management** - Consider Docker secrets or environment variable encryption
7. **Regular updates** - Keep Docker images and dependencies updated

## Optional: Set Up Automated Backups

Create a backup script:
```bash
nano /opt/backup-lift-tracker.sh
```

```bash
#!/bin/bash
# Update BACKUP_DIR to match your volume's mount point
BACKUP_DIR="/mnt/volume_atl1_01/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Load environment variables
source /opt/lift-tracker/.env

# Backup database
docker compose -f /opt/lift-tracker/docker-compose.yml exec -T db \
  mysqldump -u root -p${MYSQL_ROOT_PASSWORD} lift_tracker \
  > $BACKUP_DIR/db_backup_$DATE.sql

# Compress the backup
gzip $BACKUP_DIR/db_backup_$DATE.sql

# Keep only last 30 days of backups
find $BACKUP_DIR -name "db_backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

Make it executable and add to cron:
```bash
chmod +x /opt/backup-lift-tracker.sh
crontab -e
```

Add this line for daily backups at 2 AM:
```
0 2 * * * /opt/backup-lift-tracker.sh >> /var/log/lift-tracker-backup.log 2>&1
```

## DigitalOcean Volume Management

### Check Volume Usage
```bash
# Check disk space on volume (use your actual mount point)
df -h /mnt/volume_atl1_01

# Check MySQL data size
du -sh /mnt/volume_atl1_01/mysql

# Check backup size
du -sh /mnt/volume_atl1_01/backups
```

### Create Volume Snapshots
Snapshots provide point-in-time backups of your entire volume.

**Via DigitalOcean Dashboard:**
1. Go to Volumes
2. Select your volume
3. Click "Take Snapshot"
4. Name it (e.g., `before-major-update-2026-02-15`)
5. Wait for completion

**Via DigitalOcean CLI (doctl):**
```bash
# Install doctl if not already installed
snap install doctl
doctl auth init

# Create snapshot
doctl compute volume snapshot create <volume-id> --snapshot-name "backup-$(date +%Y%m%d)"

# List snapshots
doctl compute volume snapshot list
```

### Resize Volume (if running out of space)

**IMPORTANT:** You can only increase volume size, never decrease.

1. **Via DigitalOcean Dashboard:**
   - Go to Volumes
   - Click on your volume
   - Click "Resize"
   - Choose new size
   - Confirm

2. **On your droplet after resize:**
```bash
# Stop the database container
docker compose stop db

# Resize the filesystem
resize2fs /dev/disk/by-id/scsi-0DO_Volume_xxxxx

# Verify new size
df -h /mnt/lift_tracker_volume

# Start the database container
docker compose start db
```

### Restore from Volume Snapshot

If you need to restore data from a snapshot:

1. **Create new volume from snapshot** (via dashboard):
   - Go to Volumes → Your volume → Snapshots
   - Select snapshot
   - Click "Create Volume"
   - Attach to your droplet

2. **Mount the restored volume temporarily:**
```bash
# Mount to temporary location
mkdir -p /mnt/restored_volume
mount /dev/disk/by-id/scsi-0DO_Volume_restored_xxxxx /mnt/restored_volume

# Copy data if needed
cp -r /mnt/restored_volume/mysql/* /mnt/lift_tracker_volume/mysql/

# Unmount when done
umount /mnt/restored_volume
```

### Migrate to Larger Volume

If you want to migrate to a completely new, larger volume:

```bash
# Step 1: Stop containers
docker compose down

# Step 2: Create and attach new volume via DigitalOcean dashboard

# Step 3: Format and mount new volume
mkfs.ext4 -F /dev/disk/by-id/scsi-0DO_Volume_new_xxxxx
mkdir -p /mnt/new_volume
mount /dev/disk/by-id/scsi-0DO_Volume_new_xxxxx /mnt/new_volume

# Step 4: Copy all data
rsync -avzh /mnt/lift_tracker_volume/ /mnt/new_volume/

# Step 5: Update fstab
nano /etc/fstab
# Replace old volume ID with new volume ID

# Step 6: Unmount old, mount new at original location
umount /mnt/lift_tracker_volume
umount /mnt/new_volume
mount /mnt/lift_tracker_volume  # Uses new volume from fstab

# Step 7: Verify data
ls -la /mnt/lift_tracker_volume/mysql

# Step 8: Start containers
docker compose up -d

# Step 9: Detach old volume from dashboard when confirmed working
```

### Volume Performance Tips

1. **Use SSD volumes** - Much faster than HDD for databases
2. **Monitor IOPS** - Check DigitalOcean metrics if performance is slow
3. **Regular snapshots** - Before major updates or migrations
4. **Keep backups compressed** - Saves space on volume
5. **Cleanup old logs** - Remove old application logs periodically

### Volume Cost Optimization

- Volumes are billed at $0.10/GB/month (as of 2026)
- Snapshots are billed at $0.05/GB/month
- Delete old snapshots you don't need
- Compress backups to reduce volume usage
- Monitor growth and resize proactively

---

You're all set! Your application should now be running securely on your domain with SSL and persistent storage on a DigitalOcean volume.
