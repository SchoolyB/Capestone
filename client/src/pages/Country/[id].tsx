import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CountryData } from '../../types/countryData'
import { getCountry } from '../../includes/countries'
import CountryWeather from '../../components/CountryWeather'
import getCountryHistory from '../../includes/countryTopicImports/countryHistory'
import getCountryCulture from '../../includes/countryTopicImports/countryCulture'
import getCountryGovernment from '../../includes/countryTopicImports/countryGovernment'
import getCountryEconomy from '../../includes/countryTopicImports/countryEconomy'
import getCountryReligion from '../../includes/countryTopicImports/countryReligion'
import getCountryDemographics from '../../includes/countryTopicImports/countryDemographics'
import getCountryGeography from '../../includes/countryTopicImports/countryGeography'
// USING VITE'S GLOB METHOD TO STORE IMAGES FROM FOLDERS INTO VARIABLES
const simpleCountryMaps = import.meta.glob('../../../assets/simpleMaps/*.png', {
	eager: true,
})

const locatorCountryMap = import.meta.glob(
	'../../../assets/locatorMaps/*.png',
	{
		eager: true,
	},
)

export default function countryPage(
	simpleMapAlter: string | undefined,
	locatorMapAlter: string | undefined,
) {
	const { id } = useParams<{ id: string }>()

	const [state, setState] = useState<CountryData>({
		name: '',
		nativeName: '',
		region: '',
		alpha2Code: 0,
		alpha3Code: 0,
		subregion: '',
		capital: '',
		population: 0,
		timezones: '',
		demonym: '',
		currencies: [],
		flags: {
			svg: '',
			png: '',
		},
		//population has a '?' so its not required
	})

	// BELOW THIS COMMENT Stores the data from the countryTopicData includes into state
	const [culture, setCulture] = useState('')
	const [demographics, setDemographics] = useState('')
	const [economy, setEconomy] = useState('')
	const [government, setGovernment] = useState('')
	const [history, setHistory] = useState('')
	const [religion, setReligion] = useState('')
	const [geography, setGeography] = useState('')

	// ABOVE THIS COMMENT Stores the data from the countryTopicData includes into state

	// Declaring several async functions that take the id of the current page as a param. Within the async functions we create a variable called new... that awaits the response the respective countryTopicImports includes file. We then call the set... functions and pass them the variable from the line above
	const showAllTopics = async (id: string) => {
		const newHistory = await getCountryHistory(id)
		setHistory(newHistory)

		const newCulture = await getCountryCulture(id)
		setCulture(newCulture)

		const newGovernment = await getCountryGovernment(id)
		setGovernment(newGovernment)

		const newEconomy = await getCountryEconomy(id)
		setEconomy(newEconomy)

		const newGeography = await getCountryGeography(id)
		setGeography(newGeography)

		const newReligion = await getCountryReligion(id)
		setReligion(newReligion)

		const newDemographics = await getCountryDemographics(id)
		setDemographics(newDemographics)
	}

	// CALLING THE show... FUNCTIONS AND PASSING THE ID OF THE THE CURRENT COUNTRY PAGE THAT THE USER IS ON
	showAllTopics(id!)

	//a '!' after a variable means this is definitely defined
	const fetchData = useCallback(() => getCountry(id!).then(setState), [])
	useEffect(() => {
		fetchData()
	}, [fetchData])

	// A function that dynamically generates all the alt attributes of images on a country page
	const setDynamicAltAttributes = () => {
		const newSimpleMap = document.getElementById('simpleMap')
		if (newSimpleMap != null) {
			newSimpleMap.setAttribute('alt', `A map of ${state.name}`)
			const MapAlter: any = newSimpleMap.attributes[1]
		}
		const newLocatorMap = document.getElementById('locatorMap')
		if (newLocatorMap != null) {
			newLocatorMap.setAttribute('alt', `A locator map of ${state.name}`)
			const locatorMapAlter: any = newLocatorMap.attributes[1]
		}
	}
	setDynamicAltAttributes()

	//function that finds a simple map image based off the current url
	const foundSimpleMap = Object.entries(simpleCountryMaps).find(
		([file_path, url]) => {
			const simpleMapPath = file_path.replace('../../../assets/simpleMaps/', '')

			return simpleMapPath.startsWith(id!)
		},
	) as any
	const CurrentCountrySimpleMap = foundSimpleMap
		? foundSimpleMap[1].default
		: null

	//function that finds a locator map image based off the current url
	const foundLocatorMap = Object.entries(locatorCountryMap).find(
		([file_path, url]) => {
			const locatorMapPath = file_path.replace(
				'../../../assets/locatorMaps/',
				'',
			)
			return locatorMapPath.startsWith(id!)
		},
	) as any

	const CurrentCountryLocatorMap = foundLocatorMap
		? foundLocatorMap[1].default
		: null

	// extracts the object from the currency array
	const currencyInfo = state.currencies[0]
	// extract key value from flags obj
	const flagsInfo = state.flags.svg
	// set 'alt' attribute for each flag
	const flagAltValue = `The Flag of ${state.name}`

	return (
		// COUNTRY HEADER INFO
		<div className="overallCountryInfoContainer">
			<div className="countryInfo">
				<h1 id="countryEnglishName">{state.name}</h1>
				<h3 id="countryNativeName">a.k.a {state.nativeName}</h3>
			</div>

			{/* TOPICS */}

			{/* Geography */}
			<div id="topic">
				<section
					className="topic"
					id="geography"
				>
					<h3>Geography</h3>
					<p>{geography}</p>
				</section>

				{/* History */}
				<section
					className="topic"
					id="history"
				>
					<h3>History</h3>
					<p>{history}</p>
				</section>

				{/* Demographics */}
				<section
					className="topic"
					id="demographics"
				>
					<h3>Demographics</h3>
					<p>{demographics}</p>
				</section>

				{/* Culture */}
				<section
					className="topic"
					id="culture"
				>
					<h3>Culture</h3>
					<p>{culture}</p>
				</section>

				{/* Religion */}
				<section
					className="topic"
					id="religion"
				>
					<h3>Religion</h3>
					<p>{religion}</p>
				</section>
				{/* Government */}
				<section
					className="topic"
					id="government"
				>
					<h3>Government</h3>
					<p>{government}</p>
				</section>

				{/* Economy */}
				<section
					className="topic"
					id="economy"
				>
					<h3>Economy</h3>
					<p>{economy}</p>
				</section>
			</div>

			{/* Start of information right side of screen */}
			<div className="metaDataContainer">
				<img
					id="countryInfoFlag"
					src={state.flags.svg}
					alt={flagAltValue}
				/>
				<img
					id="simpleMap"
					src={CurrentCountrySimpleMap}
					alt={simpleMapAlter}
				/>
				<img
					id="locatorMap"
					src={CurrentCountryLocatorMap}
					alt={locatorMapAlter}
				/>
				<p className="genInfoRegion">
					<u>{state.name}</u> is located in the
					<u>{state.subregion}</u> subregion of <u>{state.region}</u>
					<br />
					<p className="genInfoPopulation">
						The Population of <u>{state.name}</u> is is approx.
						<u>{state.population}</u>
					</p>
				</p>
				<p className="genInfoISOCodes ">
					<u>{state.name}'s</u> 2 Digit Alpha code is:
					<u>{state.alpha2Code}</u> and it's 3 Digit Alpha code is:
					<u>{state.alpha3Code}</u>
				</p>

				{/* Start of weather component from '../../components/CountryWeather.tsx' */}
				<CountryWeather
					capital={state.capital}
					name={state.name}
				/>
				{/* End of weather component from '../../components/CountryWeather.tsx' */}

				<p className="genInfoCurrency">
					The National Currency of {state.name} Is: <br />
					The <u>{currencyInfo?.name}</u> Represented As:
					<u>
						{currencyInfo?.symbol} and <u>{currencyInfo?.code}</u>
					</u>
					<br />
				</p>
				<p className="genInfoTimezones">
					Timezones: <u>{state.timezones}</u>
				</p>
			</div>
		</div>
	)
}
