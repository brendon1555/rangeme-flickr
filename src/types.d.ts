interface Media {
  m: string;
}

interface Image {
  title: string;
  link: string;
  media: Media;
  date_taken: string;
  description: string;
  published: string;
  author: string;
  author_id: string;
  tags: string;
}

interface FlickrData {
  title: string;
  link: string;
  description: string;
  modified: string;
  generator: string;
  items: Image[];
}
