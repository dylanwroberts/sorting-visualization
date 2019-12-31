new Vue({
  el: '#app',
  data: {
    bars: [],
    bar_count: 50,
    //in milliseconds
    speed: 15,
    loop_id: null,
    variables: {
      i: 0,
      j: 0
    },
    animation_active: false
  },
  methods: {
    //creates a array of random values 1-100
    randomize() {
      let res = [];
      for(let i = 0; i < this.bar_count; i++) {
        res[i] = Math.floor(Math.random() * 10) + 1;
      }
      this.bars = res;
    },
    //run the parameter function at the specified speed
    run(algorithm) {
      if(!this.animation_active) {
        this.variables.iteration_count = 0;
        this.animation_active = true;
        this.loop_id = setInterval(() => {
          algorithm();
        }, this.speed);
      }
    },
    //stops the setInterval
    stop() {
      this.animation_active = false;
      clearInterval(this.loop_id);
      this.variables.i = 0;
      this.variables.j = 0;
    },
    bubble() {
      let i = this.variables.i;
      let j = this.variables.j;

      if(this.bars[j] > this.bars[j + 1]) {
        //swap the elements
        let temp = this.bars[j];
        //must call Vue's set method so it detects changes
        Vue.set(this.bars, j, this.bars[j + 1]);
        Vue.set(this.bars, j + 1, temp);
      }

      this.variables.j++;

      if(j == this.bars.length - 1) {
        this.variables.j = 0;
        this.variables.i++;
      }

      if(this.bars.length - i == 0) {
        this.stop();
      }
    }
  },
  //called before vue renders to the real DOM
  beforeMount: function() {
    this.randomize();
  }
});
