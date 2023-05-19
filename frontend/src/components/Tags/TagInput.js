
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import {fetchTags, getTags} from '../../store/tags';
import './TagInput.css';

const TagInput = ({selectedTags, setSelectedTags}) => {
    const dispatch = useDispatch()
    const fetchedTags = useSelector(getTags); //brings tag options from the store

    useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await dispatch(fetchTags());
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }
      fetchData();

    }, []);
    
    const handleTagSelect = (event) => {
       const newTag = JSON.parse(event.target.value);
      setSelectedTags(prevSelectedTags => [...prevSelectedTags, newTag]);
    };
  
    return (
      <div>
        <label htmlFor="tagSelect" id='label-select-tags'>Select tags:</label>
        <select id="tagSelect" onChange={handleTagSelect}>
          <option value="" id='option-select-tag'>-- Select Tag --</option>
          {fetchedTags.map(tag => {
           return <option key={tag._id} value={JSON.stringify(tag)} id='option'>{tag.tag}</option> 
            })}
        </select>
        <ul>
          {selectedTags.map(tag => (
            <li key={tag} id='li-selected-tag'>{tag.tag}</li>
          ))}
        </ul>
      </div>
    );
  };



export default TagInput;