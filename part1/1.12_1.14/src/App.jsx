import {useState} from 'react'

const Button = ({pickAnecdote, text}) => {

    return (
        <button onClick={pickAnecdote}>
            {text}
        </button>
    )
}



const UpdatedAnecdote = ({value, anecdotes}) => {

    return <p>{anecdotes[value]}</p>
}

const VoteCounts = ({votes}) => {

    if (votes == null) {
        return (<p>has 0 votes</p>)
    }
    return (<p>has {votes} votes</p>)

}

const MostVoted = ({mostVoted,anecdotes})=> {
    return (<div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostVoted]}</p>
    </div>)
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [currentVotes, updateVoted] = useState( new Uint8Array(10))
    const [mostVotedCount, setMostVoted] = useState(0);


    const randomNumber = () => {
        const randomedValue = Math.round(Math.random() * (anecdotes.length - 1))
        setSelected(randomedValue);
    }

    const vote = (selected,currentVotes) => {
        let updatedVoteList = [...currentVotes]
        updatedVoteList[selected] +=1
        updateVoted(updatedVoteList)
        if(updatedVoteList[selected] > mostVotedCount){
            setMostVoted(selected);
        }
    }

    return (
        <div>
            <UpdatedAnecdote anecdotes={anecdotes} value={selected}></UpdatedAnecdote>
            <Button pickAnecdote={() => vote(selected,currentVotes)} text={"Vote"}/>
            <Button pickAnecdote={() => randomNumber(selected)} text={"next anecdote"}/>
            <VoteCounts votes={currentVotes[selected]}></VoteCounts>
            <MostVoted mostVoted={mostVotedCount} anecdotes={anecdotes}> </MostVoted>
            <VoteCounts votes={currentVotes[mostVotedCount]}></VoteCounts>
        </div>
    )
}

export default App