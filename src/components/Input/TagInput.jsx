import { Chip, FormLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { profileActions } from '../../store/index';
const TagInput = () => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag();
      dispatch(profileActions.addSkill(event.target.value));
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      setTags((prevTags) => [...prevTags, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };
  return (
    <div>
      <FormLabel sx={{ fontWeight: '700', color: '#363636' }}>Skills</FormLabel>
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        fullWidth
        variant="outlined"
        style={{ marginBottom: '8px' }}
        placeholder="Press Enter to add a skill"
      />
      <div>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={() => removeTag(index)}
            style={{ margin: '4px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default TagInput;
