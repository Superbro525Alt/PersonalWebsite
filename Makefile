all: run

run:
	pnpm run dev

build:
	pnpm run build

setup:
	chmod +x ./setup.sh
	./setup.sh