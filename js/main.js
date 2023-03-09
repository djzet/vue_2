let eventBus = new Vue();

Vue.component('notes',{
    props:{
        note:{
            name:{
                type: Text,
                required: true
            },
            tasks:{
                type: Array,
                required: true,
                readiness: {
                    type: Boolean,
                    required: true
                }
            },
            status: {
                type: Number,
                required: true
            }
        }
    },
    template:`
        <div class="notes">
            <div class="not-wrap">
                <div class="note">
                    <ul>
                        <li class="notes" v-for="note in colum_1"><p>{{note.name}}</p>
                            <ul>
                                <li class="tasks" v-for="task in note.tasks" v-if="task.name !== null">
                                <input type="checkbox" class="checkbox" @click="newStatus_1(note, task)">
                                <p>{{task.name}}}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="note">
                    <ul>
                        <li class="notes" v-for="note in colum_2"><p>{{note.name}}</p>
                            <ul>
                                <li class="tasks" v-for="task in note.tasks" v-if="task.name !== null">
                                <input type="checkbox" class="checkbox" @click="newStatus_2(note, task)">
                                <p>{{task.name}}}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="note">
                    <ul>
                        <li class="notes" v-for="note in colum_3"><p>{{note.name}}</p>
                            <ul>
                                <li class="tasks" v-for="task in note.tasks" v-if="task.name !== null">
                                <input type="checkbox" class="checkbox" @click="task.readiness = true">
                                <p>{{task.name}}}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <newNotes></newNotes>
        </div>
    `,
    data(){
        return{
            colum_1: [],
            colum_2: [],
            colum_3: [],
        }
    },
    mounted(){
        eventBus.$on('notes-submitted', note =>{
            this.colum_1.push(note);
        })
    },
    methods: {
        newStatus_1(note, task) {
            task.readiness = true;
            let count = 0;
            note.status = 0;
            for (let i = 0; i < 5; ++i) {
                if (note.tasks[i].name != null) {
                    count++;
                }
            }

            for (let i = 0; i < count; ++i) {
                if (note.tasks[i].readiness === true) {
                    note.status++;
                }
            }
            if (note.status/count*100 >= 50 && this.colum_2.length < 5) {
                this.colum_2.push(note)
                this.colum_1.splice(this.colum_1.indexOf(note), 1)
            } else if (this.colum_2.length === 5) {
                if(this.colum_1.length > 0) {
                    this.colum_1.forEach(item => {
                        item.tasks.forEach(item => {
                            item.required = true;
                        })
                    })
                }
            }
        },
        newStatus_2(note, task) {
            task.readiness = true;
            let count = 0;
            note.status = 0;
            for (let i = 0; i < 5; ++i) {
                if (note.tasks[i].name != null) {
                    count++;
                }
            }

            for (let i = 0; i < count; ++i) {
                if (note.tasks[i].readiness === true) {
                    note.status++;
                }
            }
            if (note.status/count*100 === 100) {
                this.colum_3.push(note)
                this.colum_2.splice(this.colum_2.indexOf(note), 1)
                note.date = new Date()
            }
            if(this.colum_2.length < 5) {
                if(this.colum_1.length > 0) {
                    this.colum_1.forEach(item => {
                        item.tasks.forEach(item => {
                            item.readiness = false;
                        })
                    })
                }
            }
        },

    }
})

Vue.component( 'newNotes',{
    template:`
    <div>
        <form class="create" @submit.prevent="onSubmit">
            <p>
                <input id="name" v-model="name" type="text" placeholder="Название">
            </p>
            <input id="task_1" v-model="task_1" type="text" placeholder="Задача">
            <input id="task_2" v-model="task_2" type="text" placeholder="Задача">
            <input id="task_3" v-model="task_3" type="text" placeholder="Задача">
            <input id="task_4" v-model="task_4" type="text" placeholder="Задача">
            <input id="task_5" v-model="task_5" type="text" placeholder="Задача">
            <button type="submit">Создать</button>
        </form>
    </div>
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
            let note = {
                name: this.name,
                tasks: [
                    {name: this.task_1, readiness: false},
                    {name: this.task_2, readiness: false},
                    {name: this.task_3, readiness: false},
                    {name: this.task_4, readiness: false},
                    {name: this.task_5, readiness: false},
                ],
                status: 0,
            }
            eventBus.$emit('notes-submitted', note);
            this.name = null;
            this.task_1 = null;
            this.task_2 = null;
            this.task_3 = null;
            this.task_4 = null;
            this.task_5 = null;
        },
    }
})

let app = new Vue({
    el: '#app',
    data: {
       name: 'Notes'
    }
})