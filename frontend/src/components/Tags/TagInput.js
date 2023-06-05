
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from 'react';
import {fetchTags, getTags} from '../../store/tags';
import './TagInput.css';

const TagInput = ({selectedTags, setSelectedTags}) => {
    const dispatch = useDispatch()
    const fetchedTags = useSelector(getTags); //brings tag options from the store
    const [tagDefault, setTagDefault] = useState('');
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
       const tagExists = selectedTags.some(tag => tag._id === newTag._id);
       if (!tagExists) {
         setSelectedTags(prevSelectedTags => [...prevSelectedTags, newTag]);
         setTagDefault('');
       }
    };

    const handleRemoveTag = (index, tagId) => {
      setSelectedTags(prevSelectedTags => {
        let updatedTags;
        if (index !== undefined) {
          updatedTags = [...prevSelectedTags];
          updatedTags.splice(index, 1);
        } else {
          updatedTags = prevSelectedTags.filter(tag => tag._id !== tagId);
        }
        return updatedTags;
        });
    };
  
    return (
      <div id='tags-div'>
        <label htmlFor="tagSelect" id='label-select-tags'>Select tags:</label>
        <select id="tagSelect" value={tagDefault} onChange={(event) => {
          setTagDefault(event.target.value);
          handleTagSelect(event);
          setTagDefault('');
        }}>
          <option value="" id='option-select-tag' disabled>-- Select Tag --</option>
          {fetchedTags.map(tag => {
           return <option key={tag._id} value={JSON.stringify(tag)} id='option'>{tag.tag}</option> 
            })}
        </select>
        <ul>
          {selectedTags.map((tag, index) => (
            <li key={tag._id} className='li-selected-tag'>{tag.tag} <button className='remove-tag-button' onClick={() => handleRemoveTag(index, tag._id)}>remove tag</button></li>
          ))}
        </ul>
      </div>
    );
  };



export default TagInput;