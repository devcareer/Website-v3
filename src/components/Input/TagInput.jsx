import { Chip, FormLabel, TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../../store/index';
const TagInput = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.skills);

  // const [tags, setTags] = useState(state);
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag(event.target.value);
    }
  };

  const addTag = (skill) => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue) {
      dispatch(profileActions.addSkill(skill));
      // setTags((prevTags) => [...prevTags, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (index) => {
    // setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    // dispatch(profileActions.removeSkill());
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
        {state.map((tag, index) => (
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
