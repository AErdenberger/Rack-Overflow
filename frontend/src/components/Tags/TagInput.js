
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import {fetchTags, getTags} from '../../store/tags';
import './TagInput.css';

const TagInput = ({selectedTags, setSelectedTags}) => {
    const dispatch = useDispatch()
    const fetchedTags = useSelector(getTags); //brings tag options from the store
    // const [selectedTags, setSelectedTags] = useState([]);
    console.log('fetchedTags', fetchedTags)
    console.log('selectedTags', selectedTags)
    // Fetch tags from the MongoDB Atlas database to populate dropdown options to the store
    useEffect(() => {
    // const x =  dispatch(fetchTags())
    //  console.log(x, 'fetchTags')
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchTags());
        console.log(response, 'fetchTags');
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }
      fetchData();

    }, []);

    // Handle tag selection
    const handleTagSelect = (event) => {
       const newTag = event.target;
       console.log(newTag)
      setSelectedTags(prevSelectedTags => [...prevSelectedTags, newTag]);
    };
  
    return (
      <div>
        <label htmlFor="tagSelect">Select tags:</label>
        <select id="tagSelect" onChange={handleTagSelect}>
          <option value="">-- Select Tag --</option>
          {fetchedTags.map(tag => {
            {console.log(tag,'tag')}
           return <option key={tag._id} value={tag}>{tag.tag}</option>
            })}
        </select>
        <ul>
          {selectedTags.map(tag => (
            <li key={tag}>{tag.tag}</li>
          ))}
        </ul>
        {/* {error && <p>Error fetching tags: {error.message}</p>} */}
      </div>
    );
  };



export default TagInput;