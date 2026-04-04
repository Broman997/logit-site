import { Metadata } from 'next';
import ShowRedirect from './ShowRedirect';

const TMDB_KEY = process.env.TMDB_API_KEY ?? '';
const TMDB_BASE = 'https://api.themoviedb.org/3';
const TMDB_IMG  = 'https://image.tmdb.org/t/p/w500';
const SITE_URL  = 'https://www.logitapp.ca';

async function fetchShowData(tmdbId: string, type: string) {
  if (!TMDB_KEY) return null;
  try {
    const endpoint = type === 'tv'
      ? `${TMDB_BASE}/tv/${tmdbId}?api_key=${TMDB_KEY}&append_to_response=videos`
      : `${TMDB_BASE}/movie/${tmdbId}?api_key=${TMDB_KEY}&append_to_response=videos`;
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    const title       = data.name ?? data.title ?? 'Unknown';
    const overview    = data.overview ?? '';
    const posterPath  = data.poster_path ?? null;
    const posterUrl   = posterPath ? `${TMDB_IMG}${posterPath}` : null;
    const videos      = data.videos?.results ?? [];
    const trailer     = videos.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube')
                     ?? videos.find((v: any) => v.site === 'YouTube');
    const trailerKey  = trailer?.key ?? null;
    return { title, overview, posterUrl, trailerKey };
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: { tmdbId: string; type: string } }
): Promise<Metadata> {
  const { tmdbId, type } = params;
  const show = await fetchShowData(tmdbId, type);
  const title       = show?.title ?? 'Check out this title on LogIT';
  const description = show?.overview
    ? show.overview.slice(0, 200)
    : 'Track TV shows and movies together with your household.';
  const imageUrl    = show?.posterUrl ?? `${SITE_URL}/icon.png`;
  const pageUrl     = `${SITE_URL}/show/${tmdbId}/${type}`;

  return {
    title,
    description,
    other: {
      'apple-itunes-app': `app-id=6760734928, app-argument=${pageUrl}`,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'LogIT: TV & Movie Tracker',
      images: [{ url: imageUrl, width: 500, height: 750, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ShowPage(
  { params }: { params: { tmdbId: string; type: string } }
) {
  const { tmdbId, type } = params;
  const show = await fetchShowData(tmdbId, type);

  return (
    <ShowRedirect
      tmdbId={tmdbId}
      type={type}
      title={show?.title ?? ''}
      overview={show?.overview ?? ''}
      posterUrl={show?.posterUrl ?? null}
      trailerKey={show?.trailerKey ?? null}
    />
  );
}
