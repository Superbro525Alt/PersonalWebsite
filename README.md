# My Website

## Usage

Visit [paulsstuff.dev](https://www.paulsstuff.dev) for the master branch or [development.paulsstuff.dev](https://development.paulsstuff.dev) for the dev branch

### Build

#### Presequisites

##### Node
`^20.8.0`

Install on linux using nvm
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc
nvm install 20.8.0
```

To check if it has installed correctly run `node -v` and `npm -v`

To install on windows:
1. Download the installer from [here](https://nodejs.org/en/download/)
2. Run the installer
3. Restart your computer
4. To check if it has installed correctly run `node -v` and `npm -v`

##### Make
`^4.3.0`

To install on linux run `sudo apt install build-essentials`

To install on windows:
1. Download the installer from [here](http://gnuwin32.sourceforge.net/packages/make.htm)
2. Run the installer
3. Restart your computer
4. To check if it has installed correctly run `make -v`

##### pnpm (optional for linux)
`^6.14.0`

**Will install when running `make setup`**

To install run `npm i -g pnpm`


#### Linux

To setup and install dependencies (including pnpm) `make setup`

To build the project `make build`

To run the project `make run`or `make`

#### Windows

To setup and install dependencies (including pnpm) `pnpm install`

To build the project `make build

To run the project `make run` or `make