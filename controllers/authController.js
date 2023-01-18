import User from "../models/userModel.js"
import bcrypt from "bcryptjs"

const authController = {}

authController.signUp = async (req, res) => {
    try {
        const {username, password} = req.body;
        const hashPass = await bcrypt.hash(password, 12);

        const user = await User.create({
            username,
            password: hashPass
        })

        req.session.user = user;

        res.status(201).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            error: e
        })
    }
}

authController.login = async (req, res) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({username})

        if (!user) {
            res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })

            return
        }

        const passResult = await bcrypt.compare(password, user.password);
        if (!passResult) {
            res.status(404).json({
                status: 'fail',
                message: 'Incorrect username or password'
            })

            return
        }

        req.session.user = user;

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            error: e
        })
    }
}

authController.getAll = async (req, res) => {
    const users = await User.find();

    res.status(400).json({
        status: 'success',
        data: {users}
    })
}

export default authController