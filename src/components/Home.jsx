import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Kid-friendly background image URL (you can replace with your own)
const backgroundImage = 'https://images.unsplash.com/photo-1586769852836-8d82e2244d0b?auto=format&fit=crop&w=1400&q=80';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 100vh;
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #3B82F6; /* Sky Blue */
  text-shadow: 2px 2px #fff;
  margin-bottom: 15px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 40px;
  text-align: center;
  max-width: 700px;
`;

const GameOptions = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
`;

const GameCard = styled.div`
  background-color: ${(props) => props.bgColor || 'white'};
  color: ${(props) => props.color || '#000'};
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  padding: 25px;
  width: 250px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  }
`;

const GameTitle = styled.h3`
  font-size: 1.7rem;
  margin-bottom: 10px;
`;

const GameDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 15px;
`;

const GameButton = styled(Link)`
  display: inline-block;
  padding: 12px 25px;
  background-color: rgba(255,255,255,0.9);
  color: ${(props) => props.color || '#000'};
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: #fff;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Welcome to the Game Hub</Title>
      <Description>Enjoy our fun and interactive games! Choose one below to get started.</Description>
      <GameOptions>
        <GameCard bgColor="#EFF6FF" color="#3B82F6"> {/* Sky Blue */}
          <GameTitle>Quiz Challenge</GameTitle>
          <GameDescription>Test your knowledge with a variety of questions across different topics.</GameDescription>
          <GameButton to="/quiz" color="#3B82F6">Play Quiz</GameButton>
        </GameCard>

        <GameCard bgColor="#ECFDF5" color="#10B981"> {/* Emerald Green */}
          <GameTitle>Sliding Puzzle</GameTitle>
          <GameDescription>Rearrange the tiles to reconstruct a beautiful image.</GameDescription>
          <GameButton to="/puzzle" color="#10B981">Play Puzzle</GameButton>
        </GameCard>

        <GameCard bgColor="#FFFBEB" color="#F59E0B"> {/* Amber Yellow */}
        <GameTitle>Scramble Game</GameTitle>
        <GameDescription>Reorder the words to match the sign video and improve your memory skills.</GameDescription>
        <GameButton to="/scramble-game" color="#F59E0B">Play Scramble</GameButton>
        </GameCard>

        <GameCard bgColor="#FEF2F2" color="#EF4444"> {/* Rose Pink */}
          <GameTitle>Word Scramble</GameTitle>
          <GameDescription>Unscramble the words and have fun while learning!</GameDescription>
          <GameButton to="/scramble" color="#EF4444">Play Scramble</GameButton>
        </GameCard>

        <GameCard bgColor="#F5F3FF" color="#8B5CF6"> {/* Violet Purple */}
          <GameTitle>Color Match</GameTitle>
          <GameDescription>Match the colors and sharpen your observation skills.</GameDescription>
          <GameButton to="/colormatch" color="#8B5CF6">Play Color Match</GameButton>
        </GameCard>

        <GameCard bgColor="#ECFEFF" color="#06B6D4"> {/* Teal Cyan */}
          <GameTitle>Shape Sorter</GameTitle>
          <GameDescription>Sort the shapes and improve your problem-solving skills.</GameDescription>
          <GameButton to="/shapesorter" color="#06B6D4">Play Shape Sorter</GameButton>
        </GameCard>
      </GameOptions>
    </HomeContainer>
  );
};

export default Home;
