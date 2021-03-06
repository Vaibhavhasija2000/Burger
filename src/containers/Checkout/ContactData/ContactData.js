import React,{ Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
class ContactData extends Component{
    state= {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }

    }

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="text" name="email" placeholder="your email" />
                    <input type="text" name="Street" placeholder="Street" />
                    <input type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        )
    }
}
export default ContactData;