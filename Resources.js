
export default class Resources {
    constructor(toLoad) {
        this.toLoad = toLoad;
        this.images = {};

        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }

            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        });
    };
}
