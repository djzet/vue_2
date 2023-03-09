let eventBus = new Vue();

Vue.component('notes',{
    template:`
    `,
    data(){
        return{
            colum_1: [],
            colum_2: [],
            colum_3: [],
        }
    },
    mounted(){
        eventBus.$on('notes-submitted', notes =>{
            this.colum_1.push(notes);
        })
    },
})

Vue.component( 'newNotes',{
    template:`
    `,
    data(){
        return{
            title: null,
            task_1: null,
            task_2: null,
            task_3: null,
            task_4: null,
            task_5: null,
        }
    },
})

let app = new Vue({
    el: '#app',
    data: {
       name: 'Notes'
    }
})