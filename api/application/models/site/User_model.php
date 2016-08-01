<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_model extends CI_Model {

	public function get( $id )
	{

		$this->db->where( 'id' , $id );
		$q = $this->db->get( 'users' );
		$q = $q->row();

		return $q;

	}
	public function isActive($userId){
			$this->db->select('active');
			$this->db->from('users');
			$this->db->where('id', $userId);
			$q = $this->db->get()->row();
			$q = json_decode(json_encode($q), true);
			$q = intval($q['active']);
			if($q)
				return true;
			else
				return false;
	}
	public function create( $user )
	{
		$this->db->insert( 'users' , $user );
	}

	public function login( $email , $password )
	{
		$this->db->where( 'email' , $email );
		$this->db->or_where('name', $email); // CHECK LOGIN !
		$q = $this->db->get( 'users' );

		$result = $q->row();

		if ( empty( $result ) || $password != $result->password || !$this->isActive($result->id))
		{
			$output = false;
		}
		else
		{
			$this->db->where('email', $email);
			$this->db->set('logtime', time());
			$this->db->update('users');
			$output = $result;
		}

		return $output;

	}

}

/* End of file  */
/* Location: ./application/models/ */