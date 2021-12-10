import React, {useContext} from 'react'
import { DataContext } from '../context/DataContext'
import FirstHeader from './FirstHeader';
import SecondHeader from './SecondHeader';

const Header = ()=>{
    const {isAuth} = useContext(DataContext);
    return(
        isAuth ? <SecondHeader/> : <FirstHeader/>
    )
}
export default Header;