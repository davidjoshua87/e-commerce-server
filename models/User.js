const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const schema = mongoose.Schema;
const saltRounds = 10;


module.exports = mongoose.model('User', schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: String,
})
.pre('save', function() {
    this.password = bcrypt.hashSync(this.password, saltRounds)
})
.pre('update', function() {
    this._update.$set.password = bcrypt.hashSync(this._update.$set.password, saltRounds);
})
)
