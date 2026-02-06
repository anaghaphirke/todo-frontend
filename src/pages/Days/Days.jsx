import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JournalForm from '../../components/JournalForm/JournalForm';
import Pagination from '../../components/Pagination/Pagination';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';

import './days.scss';

const Days = () => {
	const { pageId } = useParams();
	const { user } = useContext(AuthContext);
	const [journalEntry, setjournalEntry] = useState();
	const userID = user.id;
	useEffect(() => {
		api.get(`/journal/${pageId}`).then((res) => {
			setjournalEntry(res.data?.[0] || null);
		});
	}, [userID, pageId]);

	const handleSave = async (data) => {
    const formData = new FormData();
console.log("data",data)
    Object.keys(data).forEach((key) => {
      if(key !== 'photo' || key !== 'voiceNote'){
              formData.append(key, data[key]);

      }
    });

      if (data.photo?.[0]) {
    formData.append('photo', data.photo[0]);
  }

  if (data.voiceNote?.[0]) {
    formData.append('voiceNote', data.voiceNote[0]);
  }
		try {
			await api.post(`/journal/${pageId}`, 
				formData,
        {
      headers: {
        'Content-Type': 'multipart/form-data'
      }}

			);

			alert('Saved 💜');
		} catch (err) {
			console.error(err);
			alert('Failed to save');
		}
	};

	return (
		<>
			<div className="journal-days">
				<JournalForm onSubmit={handleSave} curentPageId={pageId} defaultValues={journalEntry} />
				<Pagination curentPageId={pageId} />
			</div>
		</>
	);
};

export default Days;
