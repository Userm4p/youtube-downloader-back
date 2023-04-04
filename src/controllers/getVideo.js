
import youtubedl from 'youtube-dl-exec';
import progress from 'progress-estimator';

const getVideo = async (req, res) => {
 
    const logger = progress();
    const { url } = req.query;

    if(!url) {
        res.status(400).json({
            message: 'URL is required'
        });
    }

    const id = Math.random().toString(36).substring(2, 9);

    try {
        const promise = youtubedl(url, { output: '/public/videos/'+id+'.%(ext)s', noWarnings: true, noCallHome: true, noCheckCertificate: true, preferFreeFormats: false, youtubeSkipDashManifest: true});
        await logger(promise, `Obtaining ${url}`);
    } catch (error) {
        console.log(error);
    }   finally {
        res.status(200).sendFile(id + '.mp4', { root: './public/videos/' });
    }

};

export default getVideo;