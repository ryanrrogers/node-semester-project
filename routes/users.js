const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.js')
const saltRounds = 10

router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/signup',(req,res)=>{
    res.render('signup')
    })

router.post('/signup',(req,res)=>{
	const {name, email, password, password_2} = req.body
	let errors = []
	console.log('Username: ' + name + ' email: ' + email + ' password: ' + password)
	if(!name || !email || !password || !password_2) {
		errors.push({msg: 'Please fill out required fields'})
	}

	if(password !== password_2) {
		errors.push({msg: 'Passwords do not match!'})
	}

	if(password.length < 5) {
		errors.push({msg: 'Password must be at least 5 characters long!'})
	}

	if(errors.length > 0) {
		res.render('signup', {
			errors: errors,
			name: name,
			email: email,
			password: password,
			password_2: password_2
		})
	} else {
		User.findOne({email: email}).exec((err, user) => {
			console.log(user)
			if(user) {
				errors.push({msg: 'email already in use!'})
				render(res, errors, name, email, password, password_2)
			} else {
				const newUser = new User({
					name: name,
					email: email,
					password: password
				})

				bcrypt.genSalt(saltRounds,(err,salt) => 
					bcrypt.hash(newUser.password, salt,
						(err, hash) => {
							if(err) throw err

								newUser.password = hash

							newUser
								.save()
								.then((value) => {
									console.log(value)
									req.flash('success_msg', 'Signup Successful!')
									res.redirect('/users/login')
								})

								.catch(value => console.log(value))
							}))
				}
		})
	}
})

router.post('/login',(req,res,next)=>{
  })


router.get('/logout',(req,res)=>{
 })
module.exports  = router