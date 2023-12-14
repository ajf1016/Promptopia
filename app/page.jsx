import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
      <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      
      <p className="desc text-center">
        Promptopia is an open source ai prompting too for modern world descover, create and share creative prompts
      </p>
      <Feed />
    </section> 
  )
}

export default Home