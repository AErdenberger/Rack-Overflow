
import {useSelector} from 'react-redux';
import {fetchTags, getTags} from '../../store';
import 'TagInput.css';

const TagInput = ({selectedTags}) => {
    const fetchedTags = useSelector(getTags); //brings tag options from the store
    const [selectedTags, setSelectedTags] = useState([]);

    // Fetch tags from the MongoDB Atlas database to populate dropdown options to the store
    useEffect(() => {
     dispatch(fetchTags())
    }, []);

    // Handle tag selection
    const handleTagSelect = (event) => {
      const selectedTag = event.target.value;
      setSelectedTags(selectedTag);
    };
  
    return (
      <div>
        <label htmlFor="tagSelect">Select tags:</label>
        <select id="tagSelect" onChange={handleTagSelect}>
          <option value="">-- Select Tag --</option>
          {fetchedTags.map(tag => (
            <option key={tag._id} value={tag._id}>{tag.name}</option>
          ))}
        </select>
        <ul>
          {selectedTags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        {error && <p>Error fetching tags: {error.message}</p>}
      </div>
    );
  };



export default TagInput;