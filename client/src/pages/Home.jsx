import Categories from '../components/homepage/Categories';
import EditorsPicks from '../components/homepage/EditorsPicks';
import Featured from '../components/homepage/Featured';
import LatestBlogPosts from '../components/homepage/LatestBlogPosts';
import NewestAdditions from '../components/homepage/NewestAdditions';
import Shops from '../components/homepage/Shops';

const Home = () => {
  return (
    <div>
      <Featured />
      <NewestAdditions />
      <EditorsPicks />
      <Shops />
      <Categories />
      <LatestBlogPosts />
    </div>
  );
};

export default Home;
