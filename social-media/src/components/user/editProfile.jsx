import React, {useState} from 'react'
import { updateUser } from '../../api/userApi';

function EditProfile({ showEdit, data, token, setOff }) {
    const style = {
        display: showEdit ? "flex" : "none",
        padding:"20px",
        alignItems:"centre",
        justifyContent:"center",
        flexDirection:"column"
        
    }
    const formStyle = {
        input:{
            padding:"5px"
        }
    }
    const [userDetail, setUserDetail] = useState(data);
    console.log(data.fullname)
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail(prev =>
        ({
            ...prev,
            [name]: value
        })
        )
    }

    function handleSubmit(e){
        e.preventDefault();
        updateUser(userDetail,token)
        .then(res=>{
            console.log(res);
            setOff(false)
            window.location.reload()
        })
    }
    return (
        <div style={style}>

        <form onSubmit={handleSubmit} style={formStyle}>
            <input
                type="text"
                placeholder='fullname'
                onChange={handleChange}
                value={userDetail.fullname}
                name='fullname'
            />
            <input
                type="text"
                placeholder='username'
                onChange={handleChange}
                value={userDetail.username}
                name='username'
            />
            <input
                type="email"
                placeholder='email'
                onChange={handleChange}
                value={userDetail.email}
                name='email'
            />


            <label htmlFor="gender">Gender:</label>
            <select name="gender" id='gender' value={userDetail.gender} onChange={handleChange}>
                <option value="">Please select one…</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-Binary</option>
                <option value="other">Other</option>
                <option value="prefer not to answer">Perfer not to Answer</option>
            </select>
            <br />
            <button>Submit</button>
        </form>
        </div>
    )
}

export default EditProfile