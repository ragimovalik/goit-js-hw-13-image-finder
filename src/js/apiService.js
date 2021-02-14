const API_KEY = '20179181-b536d7b2e359c0533f6f56cb7';

export default {
  pageNumber: 1,
  inputtedText: '',
  pageCapacity: 12,

  resetPage() {
    this.pageNumber = 1;
  },

  makeFetch() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.pageNumber}&per_page=${this.pageCapacity}&key=${API_KEY}`;

    return fetch(url)
      .then(res => {
        if (res.status !== 200) {
          console.log('Status non 200');
          return;
        } else return res.json();
      })
      .then(data => {
        this.pageNumber += 1;
        return data;
      })
      .catch(err => console.log('Error message #1 from: ' + err));
  },

  get query() {
    return this.inputtedText;
  },

  set query(value) {
    this.inputtedText = value;
  },
};
