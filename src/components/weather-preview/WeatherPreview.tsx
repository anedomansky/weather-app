import React from 'react';
import { IWeatherData } from '../../interfaces/IWeatherData';
import './WeatherPreview.scss';

interface Props {
    previewData: IWeatherData | null;
}

// TODO: Work on the layout
// TODO: Style the components
const WeatherPreview: React.FC<Props> = ({ previewData }) => (
    <>
        {previewData && (
            <div className="preview">
                <span>{previewData.applicable_date}</span>
            </div>
        )}
    </>
);

export default WeatherPreview;
