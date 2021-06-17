const app = Vue.createApp({
    data() {
        return {
            galleryID: '72157719420444286',
            APIkey: 'd5e203055471c3d4f1280e08f6a708f8',
            images: [],
            imagesToDisplay: 52,
            bigImage: null,
            bigTitle: null,
            showError: null,
            preloader: true
        }
    },
    methods: {
        getPhotos() {
            fetch(`https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${this.APIkey}&gallery_id=${this.galleryID}&per_page=${this.imagesToDisplay}&format=json&nojsoncallback=1`)
                .then(response => response.json())
                .then(photos => this.images = photos.photos.photo)
                .catch(err => this.showError = err);
        },
        handleImageUrl(fid, server, id, secret) {
            return 'https://farm' + fid + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg'
        },
        openModal(image) {
            this.bigImage = `<img src='https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg' alt='flickr'>`;
            this.bigTitle = image.title;
        }
    },
    mounted() {
        this.getPhotos();
        document.onreadystatechange = () => {
            if (document.readyState == 'complete') {
                this.preloader = false;
            }
        }
    }

});
app.mount("#Gallery");