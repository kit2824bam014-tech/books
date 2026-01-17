const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/sign-up" ,async(req,res)=>{
    try{
        const{username,email,password,address} = req.body;

        if(username.length < 4)
        {
            return res
            .status(400)
            .json({message:"Username length should be greater than 3"})
        }

      const existingUsername =  await User.findOne({username:username });
      if(existingUsername)
      {
        return res.status(400).json({message:"Username already exist"});
      }

      const existingEmail =  await User.findOne({email:email });
      if(existingEmail)
      {
        return res.status(400).json({message:"Email already exist"});
      }

      if(password.length <= 5)
      {
        return res
            .status(400)
            .json({message:"Password should be greater than 5"});
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
            username:username,
            email:email,
            password:hashPassword,
            address: address,
      });
       
      await newUser.save();
      return res.status(200).json({message:"signup sucess"});

    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // For simplicity, no JWT, just return user
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
