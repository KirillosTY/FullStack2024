import { useSelector, useDispatch } from 'react-redux'
import  {filterList} from '../reducers/filterReducer'

const AnecdoteFilter = () => {

    const dispatch = useDispatch()

    return (<div>
        Filter: <input name="filter" onChange={()=>dispatch(filterList(event.target.value))}></input>
    </div>)

}

export default AnecdoteFilter