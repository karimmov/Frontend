import React, {useEffect, useState} from 'react'
import Footer from "../components/UI/footer/Footer";
import Header from '../components/UI/header/Header';
import '../styles/style.css';
import AnalyzesListContainer from "../components/AnalyzesListContainer";
import CategoriesModal from "../components/ModalWindows/categoriesModal/CategoriesModal";
import LoginModal from "../components/ModalWindows/loginModal/LoginModal";
import FilterContainer from "../components/filterContainer/FilterContainer";


function MainPage() {

	const analyzesDisplayModeArray = ['byCategories', 'popularAnalyzes', 'allAnalyzes', 'searchedAnalyzes'];

	const [isModalActive, setIsModalActive] = useState(false);
	const [currentCategory, setCurrentCategory] = useState({categoryid: 1, categoryname: 'Аллергены ImmunoCAP'});
	const [analyzesDisplayMode, setAnalyzesDisplayMode] = useState(analyzesDisplayModeArray[1]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoginModalActive, setIsLoginModalActive] = useState(false);


	function onPopularClick() {
		setAnalyzesDisplayMode(analyzesDisplayModeArray[1]);
	}

	function onAllClick() {
		setAnalyzesDisplayMode(analyzesDisplayModeArray[2]);
	}

	const inputProps = {
		searchQuery: searchQuery,
		setSearchQuery: setSearchQuery
	}

	return (
		<div className="MainPage" style={{position: "relative"}}>
			<CategoriesModal isActive={isModalActive} setIsActive={setIsModalActive} setCurrentCategory={setCurrentCategory}
			                 setAnalyzesDisplayMode={setAnalyzesDisplayMode}
			                 analyzesDisplayModeArray={analyzesDisplayModeArray}></CategoriesModal>
			<LoginModal isActive={isLoginModalActive} setIsActive={setIsLoginModalActive}></LoginModal>
			<div className="content">
			<Header setIsLoginModalActive={setIsLoginModalActive}></Header>
			<FilterContainer setIsModalActive={setIsModalActive} onAllClick={onAllClick} onPopularClick={onPopularClick} inputProps={inputProps}></FilterContainer>
			<div className="analysis-container" style={{display: 'flex', justifyContent: 'center', marginTop: '40px'}}>
				<AnalyzesListContainer category={currentCategory} analyzesDisplayMode={analyzesDisplayMode}
				                       analyzesDisplayModeArray={analyzesDisplayModeArray}
				                       searchQuery={searchQuery}>
				</AnalyzesListContainer>
			</div>
			</div>
			<Footer></Footer>
		</div>
	);
}

export default MainPage;