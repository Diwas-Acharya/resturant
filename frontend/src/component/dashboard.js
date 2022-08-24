import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { configurl } from "../config/serverUrl";

export default () => {
    let navigate = useNavigate();

    const [data, setData] = useState([])
    const [isEdit, setisEdit] = useState(false)
    const [formValue, setFormValue] = useState({
        name: '',
        price: '',
        photo:''
    })

    useEffect(() => {
        let userData = localStorage.getItem("userData");
        if (!userData) {
            return navigate("/");
        }
    }, []);

    const getData = async () => {
        let userData = localStorage.getItem("userData");
        userData = JSON.parse(userData);

        let response = await fetch(configurl + '/resturant-dish', {
            method: 'get',
            headers: {
                authorization: userData.token
            }
        });
        let res = await response.json();
        setData(res.data)
    }

    useEffect(() => {
        getData();
        setFormValue({
            name: '',
            price: '',
            photo:''
        })
    }, [])

    const onEdit = (i) => {
        setisEdit(true)
        setFormValue(i);
    }

    const changeFormValue = (e) => {
        const { value, name } = e.target;
        setFormValue({ ...formValue, [name]: value })
    }

    const logout = (e) => {
        localStorage.removeItem('userData');
        return navigate("/");
    }

    const onDelete = async (i) => {
        let userData = localStorage.getItem("userData");
        userData = JSON.parse(userData);
        let url = `${configurl}/resturant-dish/${i._id}` 
        let response = await fetch(url, {
            method: 'delete',
            headers: {
                authorization: userData.token
            }
        });
        let res = await response.json();

        getData();
    }

    const onSave = async (i) => {
        let userData = localStorage.getItem("userData");
        userData = JSON.parse(userData);

        let url = '';
        if (isEdit) {
            url = `${configurl}/resturant-dish/${formValue?._id}` 
        } else {
            url = configurl+ '/resturant-dish'
        }

        let response = await fetch(url, {
            method: isEdit ? 'put' : 'post',
            headers: {
                authorization: userData.token,
                "Content-Type" : "application/json"
            },
            body:JSON.stringify(formValue)
            // body:JSON.stringify(formValue)
        });
        let res = await response.json();
        alert(res.msg)
        getData();
        setisEdit(false)
        setFormValue({
            name: '',
            price: '',
            photo:''
        })
    }

    return (

        <>
            <button onClick={()=>logout()}>Logout</button>
            <div>
                <input placeholder="Name" type={'text'} name="name" onChange={(e) => changeFormValue(e)} value={formValue.name} />
                <input placeholder="Price" type={'text'} name="price" onChange={(e) => changeFormValue(e)} value={formValue.price} />
                <input placeholder="Photo" type={'text'} name="photo" onChange={(e) => changeFormValue(e)} value={formValue.photo} />
                <input type={'submit'} name="submit" value={isEdit ? 'Edit' : 'Create'} onClick={() => onSave()} />
            </div>
            <table>
                <tbody>
                    {data.map(i => <tr>
                        <td>{i.name}</td>
                        <td>{i.price}</td>
                        <td>{i.photo}</td>
                        <td>
                            <button onClick={() => onEdit(i)}>Edit</button>
                            <button onClick={() => onDelete(i)}>Delete</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </>
    )
}