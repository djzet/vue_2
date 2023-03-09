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
            name: null,
            task_1: null,
            task_2: null,
            task_3: null,
            task_4: null,
            task_5: null,
        }
    },
    methods:{
        onSubmit() {
            let notes = {
                name: this.name,
                tasks: [
                    {name: this.task_1, readiness: false},
                    {name: this.task_2, readiness: false},
                    {name: this.task_3, readiness: false},
                    {name: this.task_4, readiness: false},
                    {name: this.task_5, readiness: false},
                ],
                data: null,
                status: 0,
            }
            eventBus.$emit('notes-submitted', notes)
            this.name = null
            this.task_1 = null
            this.task_2 = null
            this.task_3 = null
            this.task_4 = null
            this.task_5 = null
        },
    }
})

let app = new Vue({
    el: '#app',
    data: {
       name: 'Notes'
    }
})