import { APIProvider, Map } from '@vis.gl/react-google-maps';

const GeneralMap = () => {
	return (
		<APIProvider apiKey="AIzaSyCZR4VCUOau8mVfA7CmTg9rMM6BpJF8f9o">
			<div style={{ height: '100%' }}>
				<Map defaultZoom={9} defaultCenter={{ lat: 50, lng: 20 }} />
			</div>
		</APIProvider>
	);
};
export default GeneralMap;
