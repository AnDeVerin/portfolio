'use strict';

const mongoose = require('mongoose');
const skillSchema = new mongoose.Schema({
  data: {},
});

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('SkillSet', skillSchema);

