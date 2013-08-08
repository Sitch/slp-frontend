#SLP Frontend

#To Get Started:
```
npm install
bower install
grunt build
```

#To enable API Proxying to localhost
add config to .htaccess file to allow folder redirect

```
<Directory "{LOCAL-PATH}/slp-frontend/api">
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Order allow,deny
    Allow from all
</Directory>
```
