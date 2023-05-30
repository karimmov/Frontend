import React, {useEffect, useState} from 'react';
import './CategoriesModal.css'

const CategoriesModal = ({
	               isActive,
	               setIsActive,
	               setCurrentCategory,
	               setAnalyzesDisplayMode,
	               analyzesDisplayModeArray,
	}) => {

	const [analysisCategories, setAnalysisCategories] = useState([]);

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (isLoaded) return;
		const url = 'http://176.124.192.224/api/AnalysisCategories';
		setIsLoaded(true);
		fetch(url).then(response => response.json()).then(result => setAnalysisCategories(result));
	}, [])

	function onCategoryClick(item) {
		let category = analysisCategories[item.target.id-1]
		setIsActive(false);
		setCurrentCategory(category);
		setAnalyzesDisplayMode(analyzesDisplayModeArray[0]);
	}

	return (
		<div className={isActive ? 'modal active' : 'modal'} onClick={() => setIsActive(false)}>
			<div className="modal__content" onClick={e => e.stopPropagation()}>
				<div className="modal__title">Категории анализов</div>
				<div className="modal__categories-container">
					{analysisCategories.map((item) =>
						<div key={item.categoryid} id={item.categoryid}
						     onClick={(e) => onCategoryClick(e)} className='modal__category'>{item.categoryname}</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CategoriesModal;