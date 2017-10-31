module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const User = require('../db/models/user');
    const Project = require('../db/models/project');
    const Post = require('../db/models/post');

    router.use((req, res, next) => {
        if (!req.user) {
            res.send(403, 'unauthorized');
        } else {
            next();
        }
    });

    router.get('/', (req, res, next) => {
        const user_id = req.user._id;
        console.log(req.user);
        console.log(user_id);
        Project.find({ people: user_id }).exec().then((data) => {
            // TODO ; sanitize data
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.send(500, err);
        });
    });

    router.post('/new', (req, res) => {
        const user_id = req.user._id;
        const { project_name } = req.body;

        Project.findOne({ 'name': project_name }, (err, projectMatch) => {
            if (projectMatch) {
                return res.json({
                    error: 'Sorry, already exists project with name ' + project_name
                });
            }

            const newProject = new Project({
                'name': project_name,
                'people': [user_id],
                'posts': []
            });

            newProject.save((err, savedProject) => {
                if (err) res.json({ error: err });
                else return res.json(savedProject);
            });
        });
    });





    router.use('/:id', (req, res, next) => {

        const project_id = req.params.id;
        const user_id = req.user._id;
        Project.findOne({ _id: project_id, people: user_id }).exec().then((project) => {
            if (!project) {
                res.send(403, 'unauthorized');
            } else {
                next();
            }
        }).catch((err) => {
            res.json({ error: err });
        });
    });

    router.delete('/:id', (req, res, next) => {
        const project_id = req.params.id;
        const user_id = req.user._id;

        Project.findOneAndRemove({ _id: project_id, people: user_id }).exec().then((removed) => {
            res.json({ removed: removed.name });
        }).catch(err => {
            res.json({ error: err });
        });
    })

    router.get('/:id/posts', (req, res, next) => {
        const project_id = req.params.id;
        const user_id = req.user._id;

        Project.findOne({
            _id: project_id,
            people: user_id
        }).select('-people -__v').populate({
            path: 'posts',
            select: '-__v',
            populate: {
                path: 'person',
                select: '-local.password -__v -projects'
            }
       }).exec().then((data) => {
            // TOODO sanitize data
            res.json(data);
        });
    });

    router.post('/:id/posts/add', (req, res, next) => {
        const project_id = req.params.id;
        const user_id = req.user._id;

        let { message } = req.body;
        // TODO sanitize message
        message = JSON.stringify(message);
        
        const newPost = Post({
            person: user_id,
            message: message
        });
        newPost.save((err, post) => {
            if(err) {
                res.json({error: err});
            } else if(!post) {
               res.json({error: 'Unknown error occurred'});
            } else {
                Project.update({
                    _id: project_id,
                    people: user_id
                }, {$push: {posts: post._id}}).then(data => {
                    res.json(data);
                }).catch(err => {
                    res.json({error: err});
                });
            }
        });

   });




    router.get('/:id/users', (req, res, next) => {

        const project_id = req.params.id;
        const user_id = req.user._id;
        console.log(project_id);

        Project.findOne({
            _id: project_id,
            people: user_id
        }).select('-posts -__v').populate({
            path: 'people',
            select: '-local.password -projects -__v'
        }).exec().then((data) => {
            res.json(data.people);
        }).catch(err => {
            res.json({ error: err });
        });
    });

    router.post('/:id/users/add', (req, res, next) => {
        const project_id = req.params.id;
        const self_user_id = req.user._id;

        const { user_id } = req.body;

        User.findOne({ _id: user_id }).exec().then((user) => {

            // user now exists, check for existance in Projects 

            Project.findOne({ _id: project_id, people: user_id }).exec().then((data) => {
                console.log(data);
                if (!data) {
                    Project.update({ _id: project_id }, { $push: { people: user_id } }).then((data) => {
                        res.json(data);
                    }).catch(err => {
                        res.json({ error: err });
                    });
                } else {
                    res.json({ error: 'User already member of the project' });
                }
            }).catch(err => {
                res.json({ error: err });
            });

        }).catch(err => {
            console.log(err);
            res.json({ error: 'User by that userid does not exist on the system' });
        });

    });



    router.delete('/:id/users/:user_id', (req, res, next) => {
        const project_id = req.params.id;
        const self_user_id = req.user._id;
        const user_id = req.params.user_id;


        User.findOne({ _id: user_id }).exec().then((user) => {

            // user now exists, check for existance in Projects 

            Project.findOne({ _id: project_id, people: user_id }).exec().then((data) => {
                console.log(data);
                if (data) {
                    Project.update({ _id: project_id }, { $pull: { people: user_id } }).then((data) => {
                        res.json(data);
                    }).catch(err => {
                        res.json({ error: err });
                    });
                } else {
                    res.json({ error: 'User is not a member of the project' });
                }
            }).catch(err => {
                res.json({ error: err });
            });

        }).catch(err => {
            console.log(err);
            res.json({ error: 'User by that userid does not exist on the system' });
        });

    });









    return router;
}