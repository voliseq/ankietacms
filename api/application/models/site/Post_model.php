<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Post_model extends CI_Model {

	public $variable;

	public function __construct()
	{
		parent::__construct();
	}

	public function Create($questionaire)
	{
			var_dump($questionaire);
				$this->db->insert('questionaires', $questionaire);
	}
	public function createComment($text, $user, $postId){

		$data = array(
			'text'=> $text,
			'user'=> $user,
			'postId'=> $postId
		);
		$this->db->insert('zapytuj_comments', $data);
		$this->db->set('comment_time', time());
		$this->db->where('name', $user);
		$this->db->update('zapytuj_users');

	}
	public function get($category, $id = false)
	{
		if($id == false)
		{
			$q = $this->db->get('zapytuj_posts');
			$q = $q->result();
		}
		else
		{
			if($id == 1)
				$offset = 0;
			else
				$offset = ($id-1) * 10;

			switch($category){
				case "nowe": {$q = $this->db->order_by('id', 'desc');}
				case "topka": {$q = $this->db->order_by('votes', 'desc');}
			}
			$q = $this->db->get('zapytuj_posts',10,$offset);
			$q = $q->result();
		}
		echo json_encode($q);
	}
	public function getOne(){
		$this->db->where('active', 1);
		$q = $this->db->get('questionaires');
		$q = $q->result();
		echo json_encode($q);
		}
	public function getUserPosts($userId, $id = false){
		if($id == false)
		{
			$q = $this->db->get('zapytuj_posts');
			$q = $q->result();
		}
		else
		{
			if($id == 1)
				$offset = 0;
			else
				$offset = ($id-1) * 10;

			$this->db->where('userId', $userId);
			$this->db->order_by('id', 'desc');
			$q = $this->db->get('zapytuj_posts',10,$offset);
			$q = $q->result();
		}
		echo json_encode($q);
	}
	public function update($postId, $ansId, $userId){

		$this->db->where('userId', $userId);
		$this->db->where('postId', $postId);
		if($this->db->get('zapytuj_votes')->result())
		{
			$output['voted'] = true;
		}
		else
		{

			//SELECT CLICKED ANSWER'S POST
			echo "nie glosowales";
			$this->db->where('id', $postId);
			$q = $this->db->get('zapytuj_posts')->result();
			$q = json_decode(json_encode($q)); 
			$allVotes = $q[0]->votes;
			$allVotes++;
			$answers = json_decode($q[0]->answers);
			$answers[$ansId]->votes++;
			$answers = json_encode($answers);
			print_r($answers);


			//UPDATE ANSWER VOUTES COUNT
			$this->db->set('answers', $answers);
			$this->db->set('votes', $allVotes);
			$this->db->where('id',$postId);
			$this->db->update('zapytuj_posts');

			//INSERT INTO VOTES
			$this->db->set('userId', $userId);
			$this->db->set('postId', $postId);
			$this->db->insert('zapytuj_votes');
			$output["voted"] = false;
		}
		return $output;
	}
	public function fakeUpdate($ip, $postId)
	{
		$this->db->from('zapytuj_fake_votes');
		$this->db->where('userIp', $ip);
		$this->db->where('postId', $postId);
		$q = $this->db->get();
		if($q->result()){
			$output['alreadyVoted'] = true;
		}
		else{
			$data = array(
				'userIp' => $ip,
				'postId' => $postId
				);
			$this->db->insert('zapytuj_fake_votes', $data);
			$output['alreadyVoted'] = false; 
		}
		return $output;
	}



}

/* End of file Post_model.php */
/* Location: ./application/models/Post_model.php */