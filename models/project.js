'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Project = new Schema({
      title: {
        type: String,
        required: [true, 'Укажите описание проекта']
      },
      techStack: {
        type: String,
        required: [true, 'Укажите технологии']
      },
      link: {
        type: String,
        required: [true, 'Укажите ссылку на проект']
      },
      picture: {
        type: String,
        required: [true, 'Укажите ссылку на файл']
      }
    });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('project', Project);