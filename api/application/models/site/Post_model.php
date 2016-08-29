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
	public function getAll()
	{
		$q = $this->db->get('questionaires');
		$q = $q->result();
		// if($id == false)
		// {

		// }
		// else
		// {
		// 	if($id == 1)
		// 		$offset = 0;
		// 	else
		// 		$offset = ($id-1) * 10;

		// 	switch($category){
		// 		case "nowe": {$q = $this->db->order_by('id', 'desc');}
		// 		case "topka": {$q = $this->db->order_by('votes', 'desc');}
		// 	}
		// 	$q = $this->db->get('zapytuj_posts',10,$offset);
		// 	$q = $q->result();
		// }
		echo json_encode($q);
	}
	public function getActive(){
		$this->db->where('active', 1);
		$q = $this->db->get('questionaires');
		$q = $q->result();
		echo json_encode($q);
		}
	public function activate($idQ){
		$this->db->set('active', 0);
		$this->db->update('questionaires');
		$this->db->set('active', 1);
		$this->db->where('id', $idQ);
		$this->db->update('questionaires');

	}
	public function delete($idQ){
		$this->db->where('id', $idQ);
		$this->db->delete('questionaires');
	}
	public function getOne($qId){
		$this->db->where('id', $qId);
		$q = $this->db->get('questionaires');
		$q = $q->result();
		echo json_encode($q);
		}
	public function getVotes($idQ){

		$this->db->where('idQ', $idQ);
		$q = $this->db->get('votes');
		$q = $q->result();
		echo json_encode($q);
	}
	public function getVotesBetweenDates($idQ, $dateStart, $dateEnd){

		$this->db->where('idQ', $idQ);
		$this->db->where('posttime >=', $dateStart/1000);
		$this->db->where('posttime <=', $dateEnd/1000);
		$q = $this->db->get('votes');
		$q = $q->result();
		echo json_encode($q);
	}
	public function fakeVote($votes)
	{
		$this->db->insert('votes', $votes);
		$output['success'] = true;
		return $output;
	}
	public function updateQ($idQ, $questionaire){
		var_dump($questionaire);
		$this->db->where('id', $idQ);
		$this->db->update('questionaires', $questionaire);
		$output['success'] = true;
		echo json_encode($output);
	}



}

/* End of file Post_model.php */
/* Location: ./application/models/Post_model.php */