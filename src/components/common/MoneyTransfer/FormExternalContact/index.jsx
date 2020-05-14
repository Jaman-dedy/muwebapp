import React, {useState} from 'react';
import {Input, Checkbox} from 'semantic-ui-react'
import Wrapper from '../../../../hoc/Wrapper';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import classes from './NewExternalContact.module.scss';

 

const NewExternalContact = () => (
    
   <Wrapper>
       <div className={classes.Input}>
            <Input 
                fluid
                name="firstName"

                // onChange={onOptionsChange}
                // disabled={destinationContact && !isEditing}
                // value={form.firstName || ''}
                placeholder={global.translate('First Name', 8)}
              />
       </div>
       <div className={classes.Input}>
           <Input fluid
                name="lastName"
                // onChange={onOptionsChange}
                // disabled={destinationContact && !isEditing}
                // value={form.lastName || ''}
                placeholder={global.translate('Last Name', 9)}
              /> 
       </div>
       
       <div>
           <PhoneInput
             country={'rw'}
             autocompleteSearch={true}
             enableSearch={true}
           /> 
       </div>
         <div className={classes.Checkbox}>
            <Checkbox defaultChecked label='Add to my contact list' /> 
         </div>
    

   </Wrapper> 
)  




export default NewExternalContact