import diary from '@/data/diary.json';
import Diary from '@/components/Diary';

export default function Home() {
  return <Diary data={diary} />;
}
