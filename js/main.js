let eventBus = new Vue();

Vue.component('notes',{
    template:`
    `,
    data(){
        return{
            colum_1: [],
            colum_2: [],
            colum_3: [],
            errors: []
        }
    },
    mounted(){
        eventBus.$on('notes-submitted', notes =>{
            this.errors = []
            if (this.colum_1.length < 3){
                this.colum_1.push(notes);
            }else {
                this.errors.push('Unable to create new entry');
            }
        })
    },
})

let app = new Vue({
    el: '#app',
    data: {
       name: 'Notes'
    }
})