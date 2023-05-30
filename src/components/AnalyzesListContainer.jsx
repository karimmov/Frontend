import React, {useEffect, useState} from 'react';
import AnalysisBlock from "./analysis-block/AnalysisBlock";

const AnalyzesListContainer = ({category, analyzesDisplayMode,analyzesDisplayModeArray, searchQuery, setAnalyzesDisplayMode}) => {

	const [analyzes, setAnalyzes] = useState([]);
	const [title, setTitle] = useState('');

	const [isFirstRender, setIsFirstRender] = useState(true);
	const [searchedAnalyzes, setSearchedAnalyzes] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		let url = ""
		if (analyzesDisplayMode === analyzesDisplayModeArray[0]) {
			url = `http://176.124.192.224/api/AnalysisTypes/${category.categoryid}`;
			setTitle(category.categoryname);
		} else if (analyzesDisplayMode === analyzesDisplayModeArray[1]) {
			url = `http://176.124.192.224/api/MostPopularAnalysis/12`;
			setTitle('Популярные анализы');
		} else if (analyzesDisplayMode === analyzesDisplayModeArray[2]) {
			url = 'http://176.124.192.224/api/AnalysisTypes';
			setTitle('Все анализы');
		} else if (analyzesDisplayMode === analyzesDisplayModeArray[3]) {
			url = 'http://176.124.192.224/api/AnalysisTypes';
			setTitle('Все анализы');
		}
		fetch(url).then(response => response.json().then(result => setAnalyzes(result)));
		setIsSearching(false);
	}, [category, analyzesDisplayMode]);


	useEffect(() => {
		if (isFirstRender)
		{
			setIsFirstRender(false);
			return;
		}
		if (searchQuery === '') {
			setIsSearching(false);
			return;
		}
		setAnalyzesDisplayMode(analyzesDisplayModeArray[3]);
		setSearchedAnalyzes(analyzes.filter(analysis => analysis.analysistitle.toLowerCase().includes(searchQuery.toLowerCase())));
		setIsSearching(true);
	}, [searchQuery])


	function analyzesRender() {
		let analysisList = isSearching ? searchedAnalyzes : analyzes;
		return (
			analysisList.map((analysis) =>
				<AnalysisBlock key={analysis.analysisid} data = {analysis}></AnalysisBlock>
			)
		)
	}

	return (
		<div className='main'>
			<div className="category-name" style={{height: '40px', whiteSpace: 'normal', overflow: 'hidden'}}>Анализы и цены: <span>{title}</span></div>
			<div className="analysis-list-wrapper">
				{analyzesRender()}
			</div>
		</div>
	);
};

export default AnalyzesListContainer;