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
            },
        },
    },
    template:`
        <div class="notes">
            <h2 class="error" v-for="error in errors">{{error}}</h2>
            <newNotes></newNotes>
            <div class="note-wrap">
                <div class="note">
                    <ul>
                        <li class="notes-li" v-for="note in colum_1"><p class="note-name">{{note.name}}</p>
                            <ul>
                                <li class="tasks" v-for="task in note.tasks" v-if="task.name !== null"">
                                <p class="p-li" :class="{ textDecoration: task.readiness }">{{task.name}}</p>
                                <input type="checkbox" class="checkbox" @click="newStatus_1(note, task)" :disabled="task.readiness">
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="note">
                    <ul>
                        <li class="notes-li" v-for="note in colum_2"><p class="note-name">{{note.name}}</p>
                            <ul>
                                <li class="tasks-2" v-for="task in note.tasks" v-if="task.name !== null">
                                <input type="checkbox" class="checkbox" @click="newStatus_2(note, task)" :disabled="task.readiness">
                                <p class="p-li" :class="{ textDecoration: task.readiness }">{{task.name}}</p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="note">
                    <ul>
                        <li class="notes-li" v-for="note in colum_3">
                            <p class="note-name">{{note.name}}</p>
                            <ul>
                                <li class="tasks-2" v-for="task in note.tasks" v-if="task.name !== null">
                                <input type="checkbox" class="checkbox" @click="task.readiness = true" :disabled="task.readiness">
                                <p class="p-li" :class="{ textDecoration: task.readiness }">{{task.name}}</p>
                                </li>
                                <p class="note-data">{{ note.date }}</p>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    data(){
        return{
            colum_1: [],
            colum_2: [],
            colum_3: [],
            errors: [],
            active: 0
        }
    },
    mounted(){
        this.colum_1 = JSON.parse(localStorage.getItem("colum_1")) || [];
        this.colum_2 = JSON.parse(localStorage.getItem("colum_2")) || [];
        this.colum_3 = JSON.parse(localStorage.getItem("colum_3")) || [];
        eventBus.$on('notes-submitted', note => {
            this.errors = []
            if (this.colum_1.length < 3){
                this.colum_1.push(note);
                this.saveNote_1();
            } else {
                this.errors.push('Maximum number of tasks!');
            }
        })
    },
    watch: {
        colum_1(newValue) {
            localStorage.setItem("colum_1", JSON.stringify(newValue));
        },
        colum_2(newValue) {
            localStorage.setItem("colum_2", JSON.stringify(newValue));
        },
        colum_3(newValue) {
            localStorage.setItem("colum_3", JSON.stringify(newValue));
        }
    },
    methods: {
        saveNote_1(){
            localStorage.setItem('colum_1', JSON.stringify(this.colum_1));
        },
        saveNote_2(){
            localStorage.setItem('colum_2', JSON.stringify(this.colum_2));
        },
        saveNote_3(){
            localStorage.setItem('colum_3', JSON.stringify(this.colum_3));
        },
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
                                item.readiness = true;
                            })
                        })
                    }
                }
                this.saveNote_2();
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
            this.saveNote_3();
        },
    },
})

Vue.component( 'newNotes',{
    template:`
    <section class="section-modal">
        <a href="#openModal" class="button">Создать заметку</a>
        <div id="openModal" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <a href="#" class="close">×</a>
                    </div>
                    <div class="modal-body">
                        <div class="create_form">
                            <form class="create" @submit.prevent="onSubmit">
                                <input id="name" v-model="name" type="text" placeholder="Название" required maxlength="20">
                                <input id="task_1" v-model="task_1" type="text" placeholder="Задача 1 " required maxlength="20">
                                <input id="task_2" v-model="task_2" type="text" placeholder="Задача 2" required maxlength="20">
                                <input id="task_3" v-model="task_3" type="text" placeholder="Задача 3" required maxlength="20">
                                <input id="task_4" v-model="task_4" type="text" placeholder="Задача 4" maxlength="20">
                                <input id="task_5" v-model="task_5" type="text" placeholder="Задача 5" maxlength="20">
                                <button type="submit">Создать</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        `,
    data(){
        return{
            name: null,
            task_1: null,
            task_2: null,
            task_3: null,
            task_4: null,
            task_5: null,
            errors:[],
            show: false,
        }
    },
    methods:{
        onSubmit() {
            if (this.name && this.task_1 && this.task_2 && this.task_3){
                let note = {
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
                eventBus.$emit('notes-submitted', note);
                this.name = null;
                this.task_1 = null;
                this.task_2 = null;
                this.task_3 = null;
                this.task_4 = null;
                this.task_5 = null;
            }else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.task_1) this.errors.push("task_1 required.")
                if(!this.task_2) this.errors.push("task_2 required.")
                if(!this.task_3) this.errors.push("task_3 required.")
            }
        },
        closeModal: function () {
            this.show = false
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        name: 'Notes',
    }
})