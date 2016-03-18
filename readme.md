# What is it?

Simple shooter, written using SVG + React + Redux

# Features

- you can run AWSD
- random generated landscape colors (grass, water, sand)
- shoot around you with colorful bullets
- kill monsters
- monsters can kill you
- you cannot swim

# Screenshot

<img width="1837" alt="screen shot 2016-03-13 at 8 58 43 pm" src="https://cloud.githubusercontent.com/assets/3179564/13868428/2c1a5c56-ecfb-11e5-85a0-5aeaf8a76924.png">


# How to install

```
git clone git@github.com:wwju/shooter.git
cd shooter
npm install
browserify -t [ babelify --presets [ es2015 react ] ] src/main.js -o build/main.js
python -m SimpleHTTPServer
```
