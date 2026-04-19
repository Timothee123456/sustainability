A sustainability dashboard for mesuring the school's consumption

# Set it up:
### BACKEND  
```
cd new_backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### FRONTEND  
```
cd ..
cd rating
npm install
```

### Environment Variables
```
export GOOGLE_SHEET_URL='https://docs.google.com/spreadsheets/d/YOUR_DEV_SHEET_ID/'
```


# Run it on server
### RUN WEBSITE:  
```
cd ~/sustainability/new_backend
source venv/bin/activate
sudo fuser -k 8001/tcp # kill everything on port 8001 (if needed)
gunicorn -w 4 -b 0.0.0.0:8001 "run:app"
```

### VIEW WEBSITE:   
```
ssh -p 2201 -L 8001:localhost:8001 group2@172.16.5.33
```

### BUILD REACT:  
```
cd ~/sustainability/rating
npm run build
cd ~/sustainability
rm -rf new_backend/static/*
cp -r rating/build/* new_backend/static/
```

### PUSH & PULL CHANGES FROM GITHUB  
```
cd ~/sustainability
git pull 
git add .
git status
git log
git commit -m "Your commit message here"
git push
```

# Run it on codespaces  
### RUN WEBSITE:  
```
cd /workspaces/sustainability/new_backend
source venv/bin/activate
gunicorn -w 4 -b 0.0.0.0:8001 "run:app"
```
or  
```
./run
```

### BUILD REACT:  
```
cd /workspaces/sustainability/rating
npm run build
cd /workspaces/sustainability
rm -rf new_backend/static/*
cp -r rating/build/* new_backend/static/
```
or  
```
./build_react
```